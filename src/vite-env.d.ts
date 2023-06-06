/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_IMAGE_PIECES_URL: string;
  readonly VITE_IMAGE_BOARD_URL: string;
  readonly VITE_AVATAR: string;
  readonly VITE_DEFAULT_AVATAR: string;
  readonly VITE_COUNTRY_FLAG_VIETNAM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
