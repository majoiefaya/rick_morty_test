import { Origin } from "./Origin";
import { Location } from "./Location";
export class Caracter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;

    public constructor(){
        this.id=0,
        this.name="",
        this.status="",
        this.species="",
        this.type="",
        this.gender="",
        this.origin = new Origin(),
        this.location = new Location(),
        this.image="",
        this.episode=[],
        this.url="",
        this.created=""
    }
  }