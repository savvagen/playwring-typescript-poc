import {test} from "@playwright/test";


export function Step(name?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        //wrapping the original method
        descriptor.value = async function (...args: any[]) {
            let stepParams = ()=> {
                const arg = args instanceof Object ? JSON.stringify(args) : args
                if (arg.length > 250) return arg.substring(1, 250) + " ..."
                else return arg
            }
            let stepName = name ? name : `Step: ${propertyKey} with parameters: ${stepParams()}`
            return await test.step(stepName, async () => {
                return await originalMethod.apply(this, args);
            })
        }
    }
}
