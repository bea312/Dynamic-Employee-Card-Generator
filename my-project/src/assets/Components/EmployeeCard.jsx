import React from 'react'

function EmployeeCard({ employee }) {
  const {
    id,
    name,
    email,
    phone,
    website,
    company: { name: companyName },
  } = employee

  const handlePrintCard = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=700')
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>${name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            .card { border: 1px solid #ddd; border-radius: 10px; padding: 16px; max-width: 520px; }
            p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>${name}</h2>
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Website:</strong> ${website}</p>
            <p><strong>Company:</strong> ${companyName}</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  const handleDownloadCard = () => {
    const content = [
      `Employee ID: ${id}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Website: ${website}`,
      `Company: ${companyName}`,
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-card.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
      <div className="mb-2">
        <span className="inline-block rounded bg-slate-100 px-2 py-1 text-sm text-slate-700">
          #{id}
        </span>
      </div>

      <h2 className="text-xl font-medium text-slate-900 sm:text-2xl">{name}</h2>

      <div className="mt-2 space-y-1 text-base leading-relaxed text-slate-800">
        <p>
          <strong className="font-bold">Email:</strong>{' '}
          <a href={`mailto:${email}`} className="text-slate-800 hover:underline">
            {email}
          </a>
        </p>
        <p>
          <strong className="font-bold">Phone:</strong> {phone}
        </p>
        <p>
          <strong className="font-bold">Website:</strong>{' '}
          <a
            href={`https://${website}`}
            target="_blank"
            rel="noreferrer"
            className="text-slate-800 hover:underline"
          >
            {website}
          </a>
        </p>
        <p>
          <strong className="font-bold">Company:</strong> {companyName}
        </p>
      </div>

      <div className="no-print mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handlePrintCard}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Print
        </button>
        <button
          type="button"
          onClick={handleDownloadCard}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Download
        </button>
      </div>
    </article>
  )
}

export default EmployeeCard
