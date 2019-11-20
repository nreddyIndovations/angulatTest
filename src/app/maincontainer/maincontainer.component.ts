import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Subscription, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RowDataComponent} from './row-data/row-data.component';

@Component({
  selector: 'app-maincontainer',
  templateUrl: './maincontainer.component.html',
  styleUrls: ['./maincontainer.component.css']
})
export class MaincontainerComponent implements OnInit {

  constructor(public backendService:BackendService,public dialog:MatDialog) { }

  //variables
  public postsData:any;
  public tempPostsData:any;
  public gridApi;
  public gridColumnApi;
  public frameworkComponents;
  public context;
  public columnDefs:any;
  public timer :any;
  subscription: Subscription;
  statusText: string;

  ngOnInit() {
    this.getSubscription();
  }
getSubscription(){
  this.subscription = timer(0, 10000).subscribe(()=>this.getPosts());
}
  getPosts(){
    
    this.backendService.getPosts().subscribe(response =>{
      this.columnDefs = this.createColumnDefs();
      this.postsData = [];
      this.tempPostsData = [];
      this.tempPostsData = response.hits;
      console.log(this.tempPostsData);
      for(let i=0; i<this.tempPostsData.length; i++){
        this.postsData.push(this.createRowData(this.tempPostsData[i]));
      }
      setTimeout(()=>{
        this.gridApi.sizeColumnsToFit();
      });
      this.dialog.closeAll();
      this.gridApi.setRowData(this.postsData);
    },error=>{
      console.log('Error');
    });
  }

  createColumnDefs(){
    return[
      {
        headerName:'Title',
        headerTooltip:'Title',
        field:'title',
        tooltipField:'title',
        width:250,
        sortable:true,
        filter:true,
        supressMovable:true
      },
      {
        headerName:'Url',
        headerTooltip:'Url',
        field:'url',
        tooltipField:'url',
        width:250,
        sortable:false,
        filter:false,
        supressMovable:true
      },
      {
        headerName:'Created At',
        headerTooltip:'Created At',
        field:'createdAt',
        tooltipField:'createdAt',
        width:250,
        sortable:false,
        filter:false,
        supressMovable:true
      },
      {
        headerName:'Author',
        headerTooltip:'Author',
        field:'author',
        tooltipField:'author',
        width:250,
        sortable:false,
        filter:false,
        supressMovable:true
      }
    ];
  }

  createRowData(rowObject){
    const postsGrid = {
      title:rowObject.title,
      url:rowObject.url,
      createdAt:rowObject.created_at,
      author:rowObject.author,
      commentText: rowObject.comment_text,
      createdAtI: rowObject.created_at_i,
      numComments: rowObject.num_comments,
      objectID: rowObject.objectID,
      parentId: rowObject.parent_id,
      points: rowObject.points,
      storyId: rowObject.story_id,
      storyText: rowObject.story_text,
      storyTitle: rowObject.story_title,
      storyUrl: rowObject.story_url
    };
    return postsGrid;
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridApi.redrawRows();
    this.gridApi.refreshCells();
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onRowSelected(event){
    console.log(event.data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = event.data;
    dialogConfig.width='900px';
    dialogConfig.autoFocus=false;
    const dialogRef = this.dialog.open(RowDataComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      event.data='';
        console.log('The dialog was closed');
        this.dialog.closeAll();
        this.gridApi.setRowData(this.postsData);
        //this.getPosts();
    });
  }
}
