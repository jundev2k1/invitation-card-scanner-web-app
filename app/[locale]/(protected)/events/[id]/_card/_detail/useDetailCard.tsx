
interface EventCardHistoryItemDto {
  id: string;
  scanAt: Date;
  scannedById: string;
  scannedByName: string;
  notes: string;
}

export const useEventCardDetail = () => {
  const mockData: EventCardHistoryItemDto[] = [
    {
      id: "1",
      scanAt: new Date('2026-02-24T15:30:00'),
      scannedById: "1",
      scannedByName: "John Doe",
      notes: ""
    },
    {
      id: "2",
      scanAt: new Date('2026-02-24T13:00:00'),
      scannedById: "2",
      scannedByName: "Jane Doe",
      notes: "John Doe's friend"
    },
    {
      id: "3",
      scanAt: new Date('2023-03-01T00:00:00'),
      scannedById: "3",
      scannedByName: "Bob Smith",
      notes: ""
    },
  ];

  return {
    isLoading: false,
    data: mockData
  };
};
