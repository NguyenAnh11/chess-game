/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_IMAGE_PIECES_URL: string;
  readonly VITE_IMAGE_BOARD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
