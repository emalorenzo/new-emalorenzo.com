import { MeshDistortMaterial, useTexture } from '@react-three/drei';

export interface Props {
  src: string;
  width?: number;
  height?: number;
  offset?: number;
}

export const CursorImage: React.FC<Props> = ({
  src,
  width,
  height,
  offset,
}) => {
  const texture = useTexture(src);
  return (
    <mesh
      scale={[width, height, 1]}
      position={[width / 2 + offset, height / 2 + offset, 2]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshDistortMaterial speed={3} map={texture} />
    </mesh>
  );
};

CursorImage.defaultProps = {
  width: 3,
  height: 2,
  offset: 0.2,
};
