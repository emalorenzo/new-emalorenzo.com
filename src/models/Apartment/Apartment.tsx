import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import type { Group } from 'three';

export const Apartment = (props) => {
  const { nodes, materials } = useGLTF('/models/apartment-v1.glb') as any;
  const ref = useRef<Group>();

  useFrame(({ camera, clock }) => {
    // ref.current.rotation.y += 0.001;
    camera.position.x = Math.sin(clock.elapsedTime) + 2;
    // camera.position.z = Math.sin(clock.elapsedTime) + 2;
  });

  return (
    <group ref={ref} {...props} dispose={null} scale={0.3}>
      <group position={[0, -20, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          position={[6.32, 25, 1.5]}
          scale={[0.11, 1.32, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={nodes.Cube_1.material}
          position={[6.32, 20.08, 1.5]}
          scale={[0.11, 1.32, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={nodes.Cube_2.material}
          position={[6.32, 15.16, 1.5]}
          scale={[0.11, 1.32, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_3.geometry}
          material={nodes.Cube_3.material}
          position={[6.32, 10.24, 1.5]}
          scale={[0.11, 1.32, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_4.geometry}
          material={nodes.Cube_4.material}
          position={[6.32, 5.32, 1.5]}
          scale={[0.11, 1.32, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_5.geometry}
          material={nodes.Cube_5.material}
          position={[6.32, 0.4, 1.5]}
          scale={[0.11, 1.32, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_6.geometry}
          material={nodes.Cube_6.material}
          position={[6.32, -4.52, 1.5]}
          scale={[0.11, 1.32, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.WallBlack}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials.Building}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials.WallWhite}
        />
        <group position={[0, -4.92, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials.WallBlack}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials.Building}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials.WallWhite}
          />
        </group>
        <group position={[0, -9.84, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials.WallBlack}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials.Building}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials.WallWhite}
          />
        </group>
        <group position={[0, -14.76, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials.WallBlack}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials.Building}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials.WallWhite}
          />
        </group>
        <group position={[0, -19.68, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials.WallBlack}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials.Building}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials.WallWhite}
          />
        </group>
        <group position={[0, -24.6, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials.WallBlack}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials.Building}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials.WallWhite}
          />
        </group>
        <group position={[0, -29.52, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials.WallBlack}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials.Building}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials.WallWhite}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroDerecho.geometry}
          material={materials.MetalBalcony}
          position={[4.85, 24.56, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroDerecho_1.geometry}
          material={materials.MetalBalcony}
          position={[4.85, 19.64, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroDerecho_2.geometry}
          material={materials.MetalBalcony}
          position={[4.85, 14.72, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroDerecho_3.geometry}
          material={materials.MetalBalcony}
          position={[4.85, 9.8, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroDerecho_4.geometry}
          material={materials.MetalBalcony}
          position={[4.85, 4.88, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroDerecho_5.geometry}
          material={materials.MetalBalcony}
          position={[4.85, -0.04, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroDerecho_6.geometry}
          material={materials.MetalBalcony}
          position={[4.85, -4.96, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroIzquierdo.geometry}
          material={materials.MetalBalcony}
          position={[-4.82, 24.56, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroIzquierdo_1.geometry}
          material={materials.MetalBalcony}
          position={[-4.82, 19.64, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroIzquierdo_2.geometry}
          material={materials.MetalBalcony}
          position={[-4.82, 14.72, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroIzquierdo_3.geometry}
          material={materials.MetalBalcony}
          position={[-4.82, 9.8, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroIzquierdo_4.geometry}
          material={materials.MetalBalcony}
          position={[-4.82, 4.88, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroIzquierdo_5.geometry}
          material={materials.MetalBalcony}
          position={[-4.82, -0.04, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroIzquierdo_6.geometry}
          material={materials.MetalBalcony}
          position={[-4.82, -4.96, 3.69]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[1, 0.14, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroMedio.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 24.56, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroMedio_1.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 19.64, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroMedio_2.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 14.72, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroMedio_3.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 9.8, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroMedio_4.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 4.88, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroMedio_5.geometry}
          material={materials.MetalBalcony}
          position={[0.11, -0.04, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CilindroMedio_6.geometry}
          material={materials.MetalBalcony}
          position={[0.11, -4.96, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BalconyWoodTables.geometry}
          material={materials['Balcony Wood']}
          position={[-1.17, 0, 0.56]}
          scale={[1, 1, 0.85]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BalconyWoodTables_1.geometry}
          material={materials['Balcony Wood']}
          position={[-1.17, -4.92, 0.56]}
          scale={[1, 1, 0.85]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BalconyWoodTables_2.geometry}
          material={materials['Balcony Wood']}
          position={[-1.17, -9.84, 0.56]}
          scale={[1, 1, 0.85]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BalconyWoodTables_3.geometry}
          material={materials['Balcony Wood']}
          position={[-1.17, -14.76, 0.56]}
          scale={[1, 1, 0.85]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BalconyWoodTables_4.geometry}
          material={materials['Balcony Wood']}
          position={[-1.17, -19.68, 0.56]}
          scale={[1, 1, 0.85]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BalconyWoodTables_5.geometry}
          material={materials['Balcony Wood']}
          position={[-1.17, -24.6, 0.56]}
          scale={[1, 1, 0.85]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BalconyWoodTables_6.geometry}
          material={materials['Balcony Wood']}
          position={[-1.17, -29.52, 0.56]}
          scale={[1, 1, 0.85]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.HorizontalBalcony.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 24.64, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.HorizontalBalcony_1.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 19.72, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.HorizontalBalcony_2.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 14.8, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.HorizontalBalcony_3.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 9.88, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.HorizontalBalcony_4.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 4.96, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.HorizontalBalcony_5.geometry}
          material={materials.MetalBalcony}
          position={[0.11, 0.04, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.HorizontalBalcony_6.geometry}
          material={materials.MetalBalcony}
          position={[0.11, -4.88, 4.4]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VerticalBalcony.geometry}
          material={materials.MetalBalcony}
          position={[0.03, 0, -0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VerticalBalcony_1.geometry}
          material={materials.MetalBalcony}
          position={[0.03, -4.92, -0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VerticalBalcony_2.geometry}
          material={materials.MetalBalcony}
          position={[0.03, -9.84, -0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VerticalBalcony_3.geometry}
          material={materials.MetalBalcony}
          position={[0.03, -14.76, -0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VerticalBalcony_4.geometry}
          material={materials.MetalBalcony}
          position={[0.03, -19.68, -0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VerticalBalcony_5.geometry}
          material={materials.MetalBalcony}
          position={[0.03, -24.6, -0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VerticalBalcony_6.geometry}
          material={materials.MetalBalcony}
          position={[0.03, -29.52, -0.02]}
        />
        <group position={[0, 0, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_1.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[0, -4.92, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_2.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_3.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[0, -9.84, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_4.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_5.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[0, -14.76, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_6.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_7.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[0, -19.68, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_8.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_9.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[0, -24.6, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_10.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_11.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[0, -29.52, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_12.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_13.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[10, 0, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_1.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[10, -4.92, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_2.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_3.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[10, -9.84, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_4.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_5.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[10, -14.76, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_6.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_7.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[10, -19.68, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_8.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_9.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[10, -24.6, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_10.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_11.geometry}
            material={materials.MetalBalcony}
          />
        </group>
        <group position={[10, -29.52, -0.25]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_12.geometry}
            material={materials.Window}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005_13.geometry}
            material={materials.MetalBalcony}
          />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cubes.geometry}
        material={materials.MetalBlack}
        position={[-4.49, 31.42, 0.96]}
        scale={0.32}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CubeWood.geometry}
        material={materials.WoodCubes}
        position={[-4.49, 31.42, 0.96]}
        scale={0.32}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CubeWood001.geometry}
        material={materials.WoodCubes}
        position={[-4.49, 32.83, 1.66]}
        scale={0.32}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CubeWood002.geometry}
        material={materials.WoodCubes}
        position={[-4.49, 33.54, 0.96]}
        scale={0.32}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TableWood.geometry}
        material={materials.WoodCubes}
        position={[-4.49, 31.42, 0.96]}
        scale={0.32}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TableWood001.geometry}
        material={materials.WoodCubes}
        position={[-4.49, 32.13, 0.96]}
        scale={0.32}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TableWood002.geometry}
        material={materials.WoodCubes}
        position={[-4.49, 32.13, 0.26]}
        scale={0.32}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Table.geometry}
        material={materials['Balcony Wood']}
        position={[-4.26, 31.74, -0.17]}
        scale={1.43}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Table001.geometry}
        material={materials.MetalBlack}
        position={[-4.26, 31.68, -0.17]}
        scale={1.43}
      />
    </group>
  );
};

useGLTF.preload('/models/apartment-v1.glb');
