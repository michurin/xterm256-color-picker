#!/usr/bin/env python3

import sys
import json

def rgbstr(*rgb):
    return '#' + ''.join(f'{x:02x}' for x in map(int, rgb))

def main():
    var_name, file_name = sys.argv[1:]
    data = []
    with open(file_name) as fh:
        for line in fh:
            a = line.strip().split(None, 3)
            rgb = rgbstr(*a[:3])
            data.append((rgb, a[3], sum(map(int, a[:3])) > 300))
    print(f'const {var_name} = {json.dumps(data)};')

if __name__ == '__main__':
    main()
