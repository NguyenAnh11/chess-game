/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_IMAGE_PIECES_URL: string;
  readonly VITE_IMAGE_BOARD_URL: string;
  readonly VITE_AVATAR: string;
  readonly VITE_DEFAULT_AVATAR: string;
  readonly VITE_COUNTRY_FLAG_VIETNAM: string;
  readonly VITE_SOCKET_ENDPOINT: string;
  readonly VITE_SPINNER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
