import db from "../config/db.config";
import logger from "../utils/logger.util";
import { HistoryFilters } from "../types/history.type";


class HistoryService {
  async logAction(
    store_id: number,
    plu: string,
    action: string,
    description?: string
  ): Promise<object> {
    try {
      const result = await db.query(
        "INSERT INTO product_history (store_id, plu, action, description) VALUES ($1, $2, $3, $4) RETURNING *",
        [store_id, plu, action, description || null]
      );
      logger.info(`Action logged: ${JSON.stringify(result.rows[0])}`);
      return result.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error logging action: ${error.message}`);
      } else {
        logger.error("An unknown error occurred.");
      }
      throw new Error("Failed to fetch history.");
    }
  }

  async getHistory(
    filters: HistoryFilters,
    limit: number,
    page: number
  ): Promise<{ rows: object[]; total: number }> {
    try {
      const offset = (page - 1) * limit;

      const countQuery = `
      SELECT COUNT(*) AS total
      FROM product_history
      WHERE ($1::INT IS NULL OR store_id = $1)
        AND ($2::VARCHAR IS NULL OR plu = $2)
        AND ($3::VARCHAR IS NULL OR action = $3)
        AND ($4::TIMESTAMP IS NULL OR created_at >= $4)
        AND ($5::TIMESTAMP IS NULL OR created_at <= $5)
    `;

      const countResult = await db.query(countQuery, [
        filters.store_id || null,
        filters.plu || null,
        filters.action || null,
        filters.from_date || null,
        filters.to_date || null,
      ]);

      const total = Number(countResult.rows[0].total);

      const query = `
      SELECT * FROM product_history
      WHERE ($1::INT IS NULL OR store_id = $1)
        AND ($2::VARCHAR IS NULL OR plu = $2)
        AND ($3::VARCHAR IS NULL OR action = $3)
        AND ($4::TIMESTAMP IS NULL OR created_at >= $4)
        AND ($5::TIMESTAMP IS NULL OR created_at <= $5)
      ORDER BY created_at DESC
      LIMIT $6 OFFSET $7;
    `;

      const result = await db.query(query, [
        filters.store_id || null,
        filters.plu || null,
        filters.action || null,
        filters.from_date || null,
        filters.to_date || null,
        limit,
        offset,
      ]);

      return { rows: result.rows, total };
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error fetching history: ${error.message}`);
      } else {
        logger.error("An unknown error occurred.");
      }
      throw new Error("Failed to fetch history.");
    }
  }
}

export default new HistoryService();
