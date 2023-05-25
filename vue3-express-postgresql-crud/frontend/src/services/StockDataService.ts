import http from "@/http-common";

/* eslint-disable */
class StockDataService {
  getAll(): Promise<any> {
    return http.get("/stocks");
  }

  get(id: any): Promise<any> {
    return http.get(`/stocks/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/stocks", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/stocks/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/stocks/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/stocks`);
  }

  findByType(typeOfHoney: string): Promise<any> {
    return http.get(`/stocks?typeOfHoney=${typeOfHoney}`);
  }
}

export default new StockDataService();
