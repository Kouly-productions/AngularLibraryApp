import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})


export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  isDatabaseConnected: boolean = false;
  isAPIWorking: boolean = false;
  dataIds: string[] = [];
  loadedIds: Set<string> = new Set();
  lastLoadedIndex = 5;
  private scrollSubscription: any;

  constructor(protected toastr: ToastrService) { }


  ngOnInit(): void {
    
  }

  loadData(count: number): void {
    console.log("Inside loadData of BaseComponent");
    for (let i = this.lastLoadedIndex; i < this.lastLoadedIndex + count; i++) {
      if (i < this.dataIds.length) {
        this.fetchData(this.dataIds[i]);
      }
      else{
        console.log("Something went wrong")
        console.log("Data IDs:", this.dataIds);

      }
  }
  this.lastLoadedIndex += count;
}

  ngAfterViewInit() {
    const middleElement = document.querySelector('.middle');
    if(middleElement) {
    this.scrollSubscription = fromEvent(middleElement, 'scroll').subscribe(() => this.onScroll());
    }
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

  onScroll() {
    const middleElement = document.querySelector('.middle');
    if (middleElement && (middleElement.scrollHeight - middleElement.scrollTop) <= middleElement.clientHeight) {
      let newMoviesLoaded = 0;
      //If sccrolled sub, and visible heigth is almost equal to the total ScrollHeight then you are near bottom
      for (let i = this.lastLoadedIndex; i < this.lastLoadedIndex + 5 && i < this.dataIds.length; i++) {
        if(newMoviesLoaded >= 5) {
          break;
        }
        if(!this.loadedIds.has(this.dataIds[i])) {
        this.fetchData(this.dataIds[i])
        newMoviesLoaded++;
        }
      }
      this.lastLoadedIndex += newMoviesLoaded;
          if(this.lastLoadedIndex >= this.dataIds.length){
            this.toastr.info('All movies loaded!', 'INFO');
      }
    }
  }

  fetchData(movieId: string): void {
    console.log("You have to implement fetchData!");
    throw new Error('You have to implement fetchData!');
  }

  AddedToList(): void {
    if(!this.isDatabaseConnected) {
      this.toastr.error('No database linked yet', 'ERROR');
    } else {
      this.toastr.success('Sent to My list', 'SUCCESS');
    }
  }

  InfoAboutMovie(): void {
    if(!this.isAPIWorking) {
    this.toastr.error('No API linked yet', 'ERROR');
    } else {
      this.toastr.success('API is working', 'SUCCESS');
    }
  }
}