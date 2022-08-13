type StackGrabber = Omit<Error, "stack"> & {
  prepareStackTrace?(param1: unknown, param2: string): unknown;
} & { stack: { getFileName(): string }[] };

export const getCallerFileName = () => {
  const Grabber = (<unknown>Error) as StackGrabber;
  const grabber = (<unknown>new Error()) as StackGrabber;

  Grabber.prepareStackTrace = (_, stack) => stack;
  const { stack } = grabber;
  Grabber.prepareStackTrace = undefined;

  const pathSegments = stack?.[2].getFileName().split("/");
  const [fileName] = pathSegments[pathSegments.length - 1].split(".");

  return fileName;
};
