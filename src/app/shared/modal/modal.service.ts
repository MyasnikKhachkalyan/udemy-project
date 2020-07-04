import {ComponentRef, Injectable, InjectionToken, Injector} from '@angular/core';
import {Subject} from 'rxjs';
import {ComponentType, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {take} from 'rxjs/operators';
import {ModalConfig} from '../../../../models/modal.model';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {ModalComponent} from './modal/modal.component';

export class ModalRef<C = unknown, V = unknown> {
  componentInstance: C;
  private readonly onBeforeCloseSubject = new Subject<V | null>();
  private readonly onAfterCloseSubject = new Subject<V | null>();

  beforeClose = this.onBeforeCloseSubject.pipe(take(1));
  afterClose = this.onBeforeCloseSubject.pipe(take(1));

  constructor(private readonly overlayRef: OverlayRef) {
  }

  close(value: V | null = null) {
    this.onBeforeCloseSubject.next(value);
    this.overlayRef.detach();
    this.onAfterCloseSubject.next(value);
  }
}

const DEFAULT_CONFIG = {
  hasBackdrop: true,
  panelClass: ['app-modal-content'],
  backdropClass: 'cdk-overlay-dark-backdrop'
};

export const MODAL_DATA = new InjectionToken<ModalConfig>('dialog-data');

@Injectable()
export class ModalService {
  private overlayRef: OverlayRef;
  private modalPortal;

  constructor(private readonly overlay: Overlay, private readonly injector: Injector) { }

  open<V, C = unknown>(componentType: ComponentType<C>, config: ModalConfig = { }): ModalRef<C, V> {
    const dialogConfig = { ...config, ...DEFAULT_CONFIG};

    this.overlayRef = this.overlayRef || this.createOverlay(dialogConfig);
    const modalRef = new ModalRef<C, V>(this.overlayRef);
    const portalInjector = this.createPortalInjector(config, modalRef);

    this.modalPortal = new ComponentPortal(ModalComponent, null, portalInjector);
    const modalCmpRef: ComponentRef<ModalComponent> = this.overlayRef.attach(this.modalPortal);
    modalCmpRef.instance.contentComponent = componentType;
    modalCmpRef.instance.componentCreated.subscribe(
      (cmpRef) => modalRef.componentInstance = cmpRef.instance as C
    );

    return modalRef;
  }

  createPortalInjector(config: ModalConfig, modalRef: ModalRef): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(ModalRef, modalRef);
    injectionTokens.set(MODAL_DATA, config.data);

    return new PortalInjector(this.injector, injectionTokens);
  }

  createOverlay(configs): OverlayRef {
    const overlayConfigs = this.getOverlayConfig(configs);
    return this.overlay.create(overlayConfigs);
  }

  getOverlayConfig(config: ModalConfig) {
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    return new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      panelClass: config.panelClass,
      backdropClass: config.backdropClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });
  }
}
