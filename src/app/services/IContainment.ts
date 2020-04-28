import { IDrawElement } from 'src/app/draw/interfaces/IDrawElement';
import { IPoint } from '../models/interfaces/IPoint';
import { IRect } from '../models/interfaces/IRect';
import { ITransformation } from '../models/interfaces/ITransformation';

export interface IContainment {
    clone(): IContainment;
    contain(element: IDrawElement, translation: ITransformation): IPoint;
    setBounds(bounds: IRect): void;
}