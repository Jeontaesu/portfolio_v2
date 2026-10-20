"""Pretendard woff2를 core(사이트에 쓰인 글자) / hangul(나머지 KS X 1001 음절)로 나눈다 (D-030).

사용: python scripts/subset-pretendard.py <원본 woff2가 있는 폴더> <출력 폴더>
  원본: Regular.woff2 / SemiBold.woff2 / Bold.woff2 (Pretendard 릴리스의 전체 글리프 버전)
  필요: pip install fonttools brotli
출력: Pretendard-{W}.woff2, Pretendard-Hangul-{W}.woff2, core.range
  -> public/fonts/ 에 복사하고, core.range 내용을 lib/fonts/pretendard.ts 의 unicode-range에 붙여 넣는다.
"""

import pathlib
import subprocess
import sys

src, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
root = pathlib.Path(__file__).resolve().parent.parent
out.mkdir(parents=True, exist_ok=True)

hangul = {chr(i) for i in range(0xAC00, 0xD7A4)}
allowed = set()
for lead in range(0xB0, 0xC9):  # KS X 1001 한글 2350자
    for trail in range(0xA1, 0xFF):
        try:
            c = bytes([lead, trail]).decode("cp949")
        except UnicodeDecodeError:
            continue
        if c in hangul:
            allowed.add(c)
for a, b in [(0x20, 0x7E), (0xA0, 0xFF), (0x2000, 0x206F), (0x2190, 0x21FF), (0x2460, 0x24FF),
             (0x25A0, 0x25FF), (0x2600, 0x26FF), (0x3000, 0x303F), (0x3130, 0x318F)]:
    allowed.update(chr(i) for i in range(a, b + 1))

used = set()
for d in ["content", "app", "components", "lib"]:
    for p in (root / d).rglob("*"):
        if p.is_file() and p.suffix in {".ts", ".tsx", ".md", ".css"}:
            used.update(p.read_text(encoding="utf-8", errors="ignore"))

allowed |= {c for c in used if ord(c) > 0x7F and c.isprintable()}
core = {c for c in allowed if c not in hangul or c in used}
rest = allowed - core


def ranges(chars):
    cp, parts, i = sorted(ord(c) for c in chars), [], 0
    while i < len(cp):
        j = i
        while j + 1 < len(cp) and cp[j + 1] == cp[j] + 1:
            j += 1
        parts.append(f"U+{cp[i]:X}" if i == j else f"U+{cp[i]:X}-{cp[j]:X}")
        i = j + 1
    return ",".join(parts)


(out / "core.range").write_text(ranges(core))
for name, chars, prefix in [("core", core, ""), ("rest", rest, "Hangul-")]:
    txt = out / f"{name}.txt"
    txt.write_text("".join(sorted(chars)), encoding="utf-8")
    for w in ["Regular", "SemiBold", "Bold"]:
        subprocess.run(
            ["pyftsubset", str(src / f"{w}.woff2"), f"--text-file={txt}", "--flavor=woff2",
             "--layout-features=*", f"--output-file={out / f'Pretendard-{prefix}{w}.woff2'}"],
            check=True,
        )
print(f"core {len(core)}자, hangul {len(rest)}자")
