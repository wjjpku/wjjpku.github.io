#!/usr/bin/env python3
import argparse
from pathlib import Path

from PIL import Image, ImageOps


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input")
    parser.add_argument("output")
    parser.add_argument("--max-edge", type=int, default=1800)
    parser.add_argument("--quality", type=int, default=82)
    args = parser.parse_args()

    image = Image.open(args.input)
    image = ImageOps.exif_transpose(image)
    image.thumbnail((args.max_edge, args.max_edge), Image.Resampling.LANCZOS)

    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGB")

    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    image.save(args.output, "WEBP", quality=args.quality, method=6)


if __name__ == "__main__":
    main()
