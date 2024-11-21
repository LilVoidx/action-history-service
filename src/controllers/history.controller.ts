import { Request, Response, NextFunction } from "express";
import HistoryService from "../services/history.service";

class HistoryController {
  async logAction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { store_id, plu, action, description } = req.body;

      const log = await HistoryService.logAction(
        store_id,
        plu,
        action,
        description
      );
      res.status(201).json({
        success: true,
        message: "Action logged successfully.",
        data: log,
      });
    } catch (error) {
      next(error);
    }
  }

  async getHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        store_id,
        plu,
        action,
        from_date,
        to_date,
        page = 1,
        limit = 10,
      } = req.query;

      const parsedLimit = Math.max(Number(limit) || 10, 1);
      const parsedPage = Math.max(Number(page) || 1, 1);

      const { rows: logs, total } = await HistoryService.getHistory(
        {
          store_id: store_id ? Number(store_id) : undefined,
          plu: plu as string | undefined,
          action: action as string | undefined,
          from_date: from_date as string | undefined,
          to_date: to_date as string | undefined,
        },
        parsedLimit,
        parsedPage
      );

      const totalPages = Math.ceil(total / parsedLimit);

      res.json({
        success: true,
        message: "History fetched successfully.",
        data: logs,
        pagination: {
          current_page: parsedPage,
          limit: parsedLimit,
          total_pages: totalPages,
          total_records: total,
          next_page: parsedPage < totalPages ? parsedPage + 1 : null,
          prev_page: parsedPage > 1 ? parsedPage - 1 : null,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new HistoryController();
