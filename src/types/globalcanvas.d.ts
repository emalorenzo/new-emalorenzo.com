interface BlobStatusIdle {
  status: 'idle';
}

interface BlobStatusAnimate {
  status: 'preview';
  color: string;
}

interface BlobStatusFull {
  status: 'full';
  color: string;
}

export type IBlobStatus = BlobStatusIdle | BlobStatusAnimate | BlobStatusFull;
