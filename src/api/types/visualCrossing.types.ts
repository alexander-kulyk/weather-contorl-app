export interface IVisualCrossingHour {
  datetime?: string;
  temp?: number;
  feelslike?: number;
  humidity?: number;
  windspeed?: number;
  precipprob?: number;
  conditions?: string;
  icon?: string;
}

export interface IVisualCrossingDay {
  datetime?: string;
  temp?: number;
  tempmin?: number;
  tempmax?: number;
  conditions?: string;
  icon?: string;
  windspeed?: number;
  humidity?: number;
  precipprob?: number;
  sunrise?: string;
  sunset?: string;
  hours?: IVisualCrossingHour[];
}

export interface IVisualCrossingCurrentConditions {
  datetime?: string;
  temp?: number;
  feelslike?: number;
  humidity?: number;
  windspeed?: number;
  winddir?: number;
  pressure?: number;
  visibility?: number;
  uvindex?: number;
  conditions?: string;
  icon?: string;
  sunrise?: string;
  sunset?: string;
}

export interface IVisualCrossingTimelineResponse {
  address?: string;
  resolvedAddress?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  currentConditions?: IVisualCrossingCurrentConditions;
  days?: IVisualCrossingDay[];
}
