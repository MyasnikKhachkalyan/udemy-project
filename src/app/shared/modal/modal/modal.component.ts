import {Component, ComponentFactoryResolver, ComponentRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentType} from '@angular/cdk/overlay';
import {Subject} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  private readonly componentCreatedSubject = new Subject<ComponentRef<unknown>>();
  @ViewChild(TemplateRef, { static: true, read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

  componentCreated = this.componentCreatedSubject.pipe(take(1));

  componentRef: ComponentRef<unknown>;
  contentComponent: ComponentType<unknown>;
  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.viewContainerRef.clear();
    const cmpFactory = this.componentFactoryResolver.resolveComponentFactory(this.contentComponent);
    this.componentRef = this.viewContainerRef.createComponent(cmpFactory);
    this.componentCreatedSubject.next(this.componentRef);
  }

}
