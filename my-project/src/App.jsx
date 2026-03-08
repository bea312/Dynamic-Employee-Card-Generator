
import React, { useEffect, useMemo, useState } from 'react'
import EmployeeCard from './assets/Components/EmployeeCard'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchEmployees() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(API_URL, { signal: controller.signal })
        if (!response.ok) throw new Error('Fetch failed')
        const data = await response.json()
        setEmployees(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load employees.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
    return () => controller.abort()
  }, [])

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase()
    return employees.filter(({ name, email }) => {
      return (
        name.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query)
      )
    })
  }, [employees, search])

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 px-4 py-8">
      <div className="mx-auto w-full max-w-6xl">

        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Employee Cards
        </h1>

        <section className="no-print mt-4 grid gap-3 rounded-2xl bg-white p-5 shadow-lg border border-slate-200 sm:grid-cols-[1fr_auto]">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            Print All
          </button>
        </section>

        {loading && (
          <p className="mt-5 rounded-lg bg-white p-4 text-sm text-slate-600 shadow border border-slate-200">
            Loading employees...
          </p>
        )}

        {!loading && error && (
          <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <p className="mt-6 text-sm font-semibold text-indigo-700">
              {filteredEmployees.length} employees found
            </p>

            <section className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  )
}

export default App