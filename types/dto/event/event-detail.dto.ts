export interface EventDetailDto {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  locationName: string;
  address: string;
  mapUrl: string;
  thumbnailUrl: string;
  status: number;
  settings: any;
  createdAt: Date;
  updatedAt: Date;
}
