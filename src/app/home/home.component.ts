import { Component, Injectable, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [GalleryModule]
})
export class HomeComponent  implements OnInit{
  constructor(private toastr: ToastrService) {}
  showSuccess(): void {
    this.toastr.success('This is a success message', 'Tada');
  }
  images: GalleryItem[] = [];
  

  ngOnInit() {
    // Set items array
    this.images = [
      new ImageItem({ src: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DB176BD1488D7E4822256EF1778C124FC17388FC1E7F0F6D89B38AFF5FB001F6/scale?width=1200&aspectRatio=1.78&format=jpeg', thumb: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DB176BD1488D7E4822256EF1778C124FC17388FC1E7F0F6D89B38AFF5FB001F6/scale?width=1200&aspectRatio=1.78&format=jpeg' }),
      new ImageItem({ src: 'https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_TombRaiderGAMEOFTHEYEAREDITION_CrystalDynamics_S1_2560x1440-0c41fcc8db62992e8d098d304b2277f8', thumb: 'https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_TombRaiderGAMEOFTHEYEAREDITION_CrystalDynamics_S1_2560x1440-0c41fcc8db62992e8d098d304b2277f8' }),
      new ImageItem({ src: 'https://www.syfy.com/sites/syfy/files/2019/03/asm_newspaper_vol3_81-82-cover.jpg', thumb: 'https://www.syfy.com/sites/syfy/files/2019/03/asm_newspaper_vol3_81-82-cover.jpg' }),
      new ImageItem({ src: 'https://cdn.kobo.com/book-images/11c2401d-58e3-427f-80ad-82d2b2908856/1200/1200/False/the-two-towers-the-lord-of-the-rings-book-2.jpg', thumb: 'https://cdn.kobo.com/book-images/11c2401d-58e3-427f-80ad-82d2b2908856/1200/1200/False/the-two-towers-the-lord-of-the-rings-book-2.jpg' }),
      new ImageItem({ src: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/CD95B5409EA8B4987A467BADB3E0925FFFBB67665D18F8DE67E9E76967EBAE16/scale?width=1200&aspectRatio=1.78&format=jpeg', thumb: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/CD95B5409EA8B4987A467BADB3E0925FFFBB67665D18F8DE67E9E76967EBAE16/scale?width=1200&aspectRatio=1.78&format=jpeg' }),
      new ImageItem({ src: 'https://esport.dk/storage/Artikler/cs2.jpg', thumb: 'https://esport.dk/storage/Artikler/cs2.jpg' }),
      new ImageItem({ src: 'https://d1466nnw0ex81e.cloudfront.net/n_iv/600/988547.jpg', thumb: 'https://d1466nnw0ex81e.cloudfront.net/n_iv/600/988547.jpg' }),
      new ImageItem({ src: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1413766373i/11560179._SX540_.jpg', thumb: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1413766373i/11560179._SX540_.jpg' }),
      new ImageItem({ src: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/03BE24C8533E2B6128DAB52B3F7E91723330681DF1CB7214FC38482D6592BA57/scale?width=1200&aspectRatio=1.78&format=jpeg', thumb: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/03BE24C8533E2B6128DAB52B3F7E91723330681DF1CB7214FC38482D6592BA57/scale?width=1200&aspectRatio=1.78&format=jpeg' }),
      new ImageItem({ src: 'https://i.ytimg.com/vi/dZl1yGUetjI/maxresdefault.jpg', thumb: 'https://i.ytimg.com/vi/dZl1yGUetjI/maxresdefault.jpg' }),

      // ... more items
    ];
  }
}
