import {Composition} from 'remotion';
import {Kembar} from './Kembar';
export const Root = () => (
  <Composition id="Kembar" component={Kembar} durationInFrames={450} fps={30} width={1080} height={1920} />
);
