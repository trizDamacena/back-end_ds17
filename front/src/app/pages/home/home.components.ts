import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector:'app-home',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './home.components.html',
    styleUrl: './home.components.css'
})

export class HomeComponent {}