import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {DocsService} from '../services/docs.service';
import {UserService} from '../services/user.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  files = [];
  docs: MatTableDataSource<any>;

  constructor(private docSer: DocsService, private userSer: UserService, private router: Router) {


  }

  getAllDocs() {
    let sessionID = localStorage.getItem('session-id');
    let body = {
      "params": {
        "company_id": parseInt(localStorage.getItem('company-id'))
      }
    };
    this.docSer.getDocs(sessionID, body).subscribe(
      (res: any) => {
        // Assign the data to the data source for the table to render
        this.docs = new MatTableDataSource(res.result.documents);
        this.docs.paginator = this.paginator;
        this.docs.sort = this.sort;
      },
      (err) => console.log(err)
    );
  }

  ngOnInit() {
    this.getAllDocs();
  }

  //filtering method
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.docs.filter = filterValue.trim().toLowerCase();

    if (this.docs.paginator) {
      this.docs.paginator.firstPage();
    }
  }

  //start upload files methods
  uploadFile(file) {
    let sessionID = localStorage.getItem('session-id');
    let companyID = localStorage.getItem('company-id');
    let uploadMethod = '2';
    const formData = new FormData();
    formData.append('docs', file.data);
    formData.append('upload_method', uploadMethod);
    formData.append('company_id', companyID);
    file.inProgress = true;
    this.docSer
      .upload(sessionID, formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          let index = this.files.indexOf(file);
          this.files.splice(index, 1);
          this.getAllDocs();
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
  //end upload files methods

   //logout
  logout() {
    localStorage.removeItem('session-id');
    localStorage.removeItem('company-id');
    this.router.navigate(['/login'])
  }
}
