import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private _renderer2: Renderer2;

  constructor(
    private _rendererFactory: RendererFactory2
  ) {
    this._renderer2 = _rendererFactory.createRenderer(null, null);
  }

  adjustLayout(headerRef = null, wrapperRef, navigationBarContainerRef) {
    if (headerRef) {
      const headerHeight = headerRef.nativeElement.clientHeight;
      const totalPadding = `${headerHeight + 20}px`;
      this._renderer2.setStyle(wrapperRef.nativeElement, 'padding-top', totalPadding);
    }

    const wrapperInnerElem = wrapperRef.nativeElement.querySelector('.padding-bottom');
    const bottomTabHeight = `${navigationBarContainerRef.nativeElement.clientHeight}px`;
    this._renderer2.setStyle(wrapperInnerElem, 'padding-bottom', bottomTabHeight);
  }
}
