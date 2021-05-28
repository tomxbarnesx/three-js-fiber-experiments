import { useRef, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { CubeTextureLoader } from "three";
import { OrbitControls, Environment } from '@react-three/drei';

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'purple'} />
    </mesh>
  )
}

// Loads the skybox texture and applies it to the scene.
function SkyBox() {
  const { scene } = useThree();  
  const loader = new CubeTextureLoader();  
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.  
  const texture = loader.load([    
    "posx.jpg",    
    "negx.jpg",    
    "posy.jpg",    
    "negy.jpg",    
    "posz.jpg",    
    "negz.jpg",  
  ]);  // Set the scene background property to the resulting texture.  
  scene.background = texture;  
  return null;
}

export default function MainCanvas(){
  return (
    <Canvas>
      <SkyBox />
      {/*<Environment
        background={true} // Whether to affect scene.background
        files={['urban_alley_01_2k.hdr']} // Array of cubemap files OR single equirectangular file
        path={'/'} // Path to the above file(s)
        preset={'city'} // Preset string (overrides files and path)
        scene={undefined} // adds the ability to pass a custom THREE.Scene
      />*/}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />   
    </Canvas>
  )
}