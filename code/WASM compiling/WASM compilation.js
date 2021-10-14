import { readFile } from 'fs/promises';
import { WASI } from 'wasi';
import { argv, env } from 'process';

const wasi = new WASI({
  args: argv,
  env,
  preopens: {
    '/sandbox': '/some/real/path/that/wasm/can/access'
  }
});

// Some WASI binaries require:
//   const importObject = { wasi_unstable: wasi.wasiImport };
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasm = await WebAssembly.compile(
  await readFile(new URL('./demo.wasm', import.meta.url))
);
const instance = await WebAssembly.instantiate(wasm, importObject);

wasi.start(instance);