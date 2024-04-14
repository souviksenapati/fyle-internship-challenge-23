import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.services';

@Component({
  selector: 'app-github-app',
  templateUrl: './github-app.component.html',
  styleUrls: ['./github-app.component.css']
})
export class GithubAppComponent implements OnInit {
  public githubUserQuery!: string;
  public githubProfile: any;
  public githubRepos: any[] = [];
  public pagedRepos: any[] = [];
  public errorMessage!: string;
  public currentPage: number = 1;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 25, 50, 100];
  public totalPages: number = 1;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    // Initialization logic here
  }

  public searchUser() {
    this.githubService.getProfile(this.githubUserQuery).subscribe(
      (data: any) => {
        this.githubProfile = data;
      },
      (error: string) => {
        this.errorMessage = error;
      }
    );
    this.fetchRepositories();
  }

  public onPageChange(page: number) {
    this.currentPage = page;
    this.fetchRepositories();
  }

  public onPageSizeChange(event: any) {
    this.currentPage = 1;
    this.pageSize = event.target.value;
    this.fetchRepositories();
  }

  private fetchRepositories() {
    this.githubService.getRepos(this.githubUserQuery, this.currentPage, this.pageSize)
      .subscribe(
        (data) => {
          this.githubRepos = data; // Assuming the response directly contains the list of repositories
          this.pagedRepos = data;
          // Set total pages based on the number of repositories and page size
          this.totalPages = Math.ceil(this.githubRepos.length / this.pageSize);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

  public getPageRange(): number[] {
    const range = [];
    const maxPages = 9; // maximum number of page numbers to display

    const startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  }
}
