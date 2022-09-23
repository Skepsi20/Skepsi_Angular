import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  title = 'angular-boilerplate';
  loading: any = false;

  constructor(
    private readonly spinnerService: SpinnerService
    ) { }
  isLoading$ = this.spinnerService.isLoading$;

  ngOnInit(): void {
    this.listenToLoading();
    //console.log(this.isLoading$)
  }

  listenToLoading(): void {
    this.spinnerService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
