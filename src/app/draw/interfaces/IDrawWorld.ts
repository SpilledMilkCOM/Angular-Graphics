
import { IDrawElement } from './IDrawElement'
import { IDrawViewport } from './IDrawViewport';

export interface IDrawWorld {
    elements: IDrawElement[];
    viewport: IDrawViewport;

    addElement(element: IDrawElement): void;
    setViewport(viewport: IDrawViewport): void;
}