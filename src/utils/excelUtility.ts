import * as excel from "exceljs"

export const createExcel = async (
  name: string,
  headers: Partial<excel.Column>[],
  rows: any[]
): Promise<Buffer> => {
  const workbook = new excel.stream.xlsx.WorkbookWriter({})
  workbook.creator = "joeldrt@gmail.com"
  workbook.lastModifiedBy = "joeldrt@gmail.com"
  workbook.created = new Date()
  workbook.modified = new Date()
  workbook.lastPrinted = new Date()
  const sheet = workbook.addWorksheet(name)
  sheet.columns = headers
  for (const row of rows) {
    sheet.addRow(row)
  }
  sheet.commit()
  return new Promise((resolve, reject): void => {
    workbook
      .commit()
      .then(() => {
        const stream: any = (workbook as any).stream
        const result: Buffer = stream.read()
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
