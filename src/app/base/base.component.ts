import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})


export class BaseComponent implements OnInit, OnDestroy {
  isSearching:boolean=false;
  isDatabaseConnected: boolean = false;
  isAPIWorking: boolean = false;
  dataIds: string[] = [];
  searchDataId: string[] = [];
  dataIdsWaitingList: string[] = [];
  loadedIds: Set<string> = new Set();
  currentPage: number = 1;

  constructor(protected toastr: ToastrService) { }


  ngOnInit(): void {
    
  }

  loadData(count: number): void {
    let startIndex = (this.currentPage - 1) * count;

    for (let i = startIndex; i < startIndex + count; i++) {
      if (i < this.dataIds.length) {
        this.fetchData(this.dataIds[i]);
      } else {
        console.log("Something went wrong");
        console.log("Data IDs:", this.dataIds);
      }
    }
  }

  loadSearchedData(count: number): void {
    let startIndex = (this.currentPage - 1) * count;

    for (let i = startIndex; i < startIndex + count; i++) {
      if (i < this.searchDataId.length) {
        this.fetchData(this.searchDataId[i]);
      } else {
        console.log("Something went wrong");
        console.log("Data IDs:", this.searchDataId);
      }
    }
  }

  clearData(): void {
    console.log("You have to implement clearData!");
    throw new Error('You have to implement clearData!');
  }

  onNextPage() {
    console.log('Next Page button clicked!');
    this.clearData();
    this.currentPage++;
    if(this.isSearching==false){
      this.loadData(8);
    }else{
      this.loadData(8);
    }
  }


  onPrevPage() {
    console.log('Previous Page button clicked!');
    this.clearData();
    if (this.currentPage > 1) {
      this.currentPage--;
      if(this.isSearching==true){
        this.loadData(8);
      }else{
        this.loadData(8);
      }
    }
  }

  ngOnDestroy() {

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