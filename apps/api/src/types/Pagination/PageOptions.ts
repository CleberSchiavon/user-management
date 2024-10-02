import { PageOptionsDto } from "~/modules/pagination/dto/PageOptions.dto";

export interface PageMetaDtoParameters {
  paginationOptions: PageOptionsDto;
  itemCount: number;
}