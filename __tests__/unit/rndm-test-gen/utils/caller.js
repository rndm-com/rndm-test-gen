import { test } from './paths';

const STACK_FRAME_RE = new RegExp(/at ((\S+)\s)?\(?([^:]+):(\d+):(\d+)/);

const caller = () => {
  const err = new Error();
  Error.captureStackTrace(err);
  const frames = err.stack.split('\n').slice(1);
  const frame = frames.find(frame => frame.includes(test));
  if (!frame) { return null; }
  const [ method, module, line, column ] = STACK_FRAME_RE.exec(frame).slice(2);
  return {
    method,
    module,
    line,
    column,
  };
};

export default caller;
