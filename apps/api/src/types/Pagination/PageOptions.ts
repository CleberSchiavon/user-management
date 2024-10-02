import { PageOptionsDto } from "~/modules/pagination/dto/PageOptions.dto";

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}