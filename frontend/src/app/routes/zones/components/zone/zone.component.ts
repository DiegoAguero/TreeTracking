import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.css'
})
export default class ZoneComponent implements OnInit {
  
  @Input() id = 'id';
  ngOnInit(): void {
    // Fetch zone for if
  }

}
