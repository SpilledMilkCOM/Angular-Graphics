import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'view-test'
  , styleUrls: ['./test.component.css']
  , templateUrl: './test.component.html'
})
export class TestComponent implements AfterViewInit {
  public title = 'Test';

  public gridListHeight: number;
  public gridListWidth: number;
  public tabGroupHeight: number;
  public tabGroupWidth: number;
  public windowHeight: number;
  public windowWidth: number;

  @ViewChild('gridListId') gridList;
  @ViewChild('tabGroupId') tabGroup;

  ngAfterViewInit(): void {

    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;

    // Probably shouldn't use the "internal" _element member.

    this.gridListHeight = this.gridList._element.nativeElement.clientHeight;
    this.gridListWidth = this.gridList._element.nativeElement.clientWidth;

    this.tabGroupHeight = this.tabGroup._elementRef.nativeElement.clientHeight;
    this.tabGroupWidth = this.tabGroup._elementRef.nativeElement.clientWidth;
  }

  onResize(event) {

    this.gridListHeight = this.gridList._element.nativeElement.clientHeight;
    this.gridListWidth = this.gridList._element.nativeElement.clientWidth;

    this.tabGroupHeight = this.tabGroup._elementRef.nativeElement.clientHeight;
    this.tabGroupWidth = this.tabGroup._elementRef.nativeElement.clientWidth;

    // The canvas is based on the width and height
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
  }
}