import { Injectable } from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {LoaderComponent} from './loader/loader.component';

@Injectable()
export class LoaderService {
  private IsLoading = false;
  private overlayRef: OverlayRef

  get isLoading() {
    return this.IsLoading;
  }

  constructor(private overlay: Overlay) { }

  showLoader() {
    if (this.IsLoading) {
      return;
    }

    this.overlayRef = this.overlayRef || this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(new ComponentPortal(LoaderComponent));
    this.IsLoading = true;
  }

  hideLoader() {
    if (!this.IsLoading) {
      return;
    }

    this.overlayRef.detach();
    this.IsLoading = false;
  }

  getOverlayConfig() {
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    return new OverlayConfig({
      hasBackdrop: true,
      positionStrategy
    });
  }
}
