import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Injectable({
    providedIn: 'root'
})
export class DynamicLoadComponentService {

    //ViewContainerRef : Dinamik olarak yüklenecek componenti içerisinde barındıran containerdır.(Her dinamik yükleme sürecinde önceki view'ları clear etmemiz gerekmekte)
    //ComponentFactory : Componentlerin instancelarınnı oluşturmak için kullnııln fabrikadır.
    ///ComponentFactoryResolver : Belirli  bir component için componentFactory'i resolve eden sınıftır.İçerisindeki 
    //resolveComponentFactory araacılığıyla ilgili componente daair bir component factory oluşturur ve döner.

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
        let _component: any = null;

        switch (component) {
            case ComponentType.BasketsComponent:
                _component = await (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
                break;
        }

        viewContainerRef.clear();
        return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component))
    }
}

export enum ComponentType {
    BasketsComponent
}
