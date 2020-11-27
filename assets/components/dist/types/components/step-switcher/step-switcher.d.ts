import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import { JSX } from '../../stencil-public-runtime';
export declare class StepSwitcher implements ComponentInterface {
    /**
     * Heading to display.
     *
     * @type {string}
     */
    heading: string;
    /**
     * Steps to display dots for.
     *
     * @type {any[]}
     */
    steps: any[];
    /**
     * Step index to show. Defaults to first step.
     *
     * @type {number}
     */
    stepIndex: number;
    /**
     * Emits the new step index as a number.
     *
     * @type {EventEmitter}
     */
    stepIndexChanged: EventEmitter<number>;
    /**
     * Set step index and emit stepIndexChanged event.
     *
     * @param {number} index
     */
    setStepIndex(index: number): void;
    render(): JSX.Element;
}
