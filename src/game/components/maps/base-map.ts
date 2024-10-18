
export default abstract class BaseMap {
  constructor (
    public readonly height: number,
    public readonly width: number,
  ) {}

  abstract isAllowed (position: [ number, number ]): boolean;

  abstract resolvePosition (position: [ number, number ]): [ number, number ];
}
