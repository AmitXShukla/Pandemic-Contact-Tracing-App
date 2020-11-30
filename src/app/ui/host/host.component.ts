import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../../services/backend.service';
// data table
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-host',
    templateUrl: './host.component.html',
    styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit, OnDestroy {

    members: any[];
    dataSource = new MatTableDataSource<any>();
    myDocData: any;
    data$: Observable<any>;
    toggleField: string;
    state: string = '';
    savedChanges = false;
    error: boolean = false;
    errorMessage: String = "";
    dataLoading: boolean = false;
    private querySubscription: any;

    //@ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['emplid', 'emplname', 'phone', 'email', '_id'];
    // file upload
    docId: string;
    fileName: string;
    showFileUpload: boolean = false;
    showDocument: boolean = false;
    docUrl: Observable<string | null>;

    constructor(private _backendService: BackendService) { }

    ngOnInit() {
        this.toggleField = "searchMode";
        this.dataSource = new MatTableDataSource(this.members);
    }

    toggle(filter?: any) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
        this.dataLoading = false;
    }

    getData(formData?: any) {
        this.dataLoading = true;
        this.querySubscription = this._backendService.getDocs('EMPLOYEE', formData).subscribe((res) => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        },
            (error) => {
                this.error = true;
                this.errorMessage = error.message;
                this.dataLoading = false;
            },
            () => {
                this.dataLoading = false;
            });
    }

    setData(formData: any) {
        this.dataLoading = true;
        this.querySubscription = this._backendService.setDoc('EMPLOYEE', formData).then(res => {
            if (res) {
                this.savedChanges = true;
                this.error = false;
                this.errorMessage = "";
                this.dataLoading = false;
            }
        }
        ).catch(err => {
            if (err) {
                this.error = true;
                this.errorMessage = err.message;
                this.dataLoading = false;
            }
        }
        );
    }

    updateData(formData: any) {
        this.dataLoading = true;
        this.querySubscription = this._backendService.updateDoc('EMPLOYEE', formData._id, formData).then(res => {
            if (res) {
                this.savedChanges = true;
                this.error = false;
                this.errorMessage = "";
                this.dataLoading = false;
            }
        }
        ).catch(err => {
            if (err) {
                this.error = true;
                this.errorMessage = err.message;
                this.dataLoading = false;
            }
        }
        );
    }

    getDoc(docId: any) {
        this.docId = docId; // this is required to pass at file upload directive
        this.dataLoading = true;
        this.data$ = this._backendService.getDoc('EMPLOYEE', docId);
        this.toggle('editMode');
        this.dataLoading = false;
    }
    getDocUrl(docUrl: any) {
        this.fileName = docUrl;
        this.docUrl = this._backendService.getFileDownloadUrl(docUrl);
    }

    deleteDoc(docId: any) {
        if (confirm("Are you sure want to delete this record ?")) {
            this.dataLoading = true;
            this._backendService.deleteDoc('EMPLOYEE', docId).then(res => {
                if (res) {
                    this.error = false;
                    this.errorMessage = "";
                    this.dataLoading = false;
                }
            }
            ).catch(err => {
                if (err) {
                    this.error = true;
                    this.errorMessage = err.message;
                    this.dataLoading = false;
                }
            }
            );
        }
    }

    //mat table paginator and filter functions
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    // applyFilter(filterValue: string) {
    //     filterValue = filterValue.trim(); // Remove whitespace
    //     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    //     this.dataSource.filter = filterValue;
    // }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
    ngOnDestroy() {
        // this is not needed when observable is used, in this case, we are registering user on subscription
        if (this.querySubscription) {
            this.querySubscription.unsubscribe();
        }
    }
}