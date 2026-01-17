export default function PasoUsuario({ datos, actualizar, siguiente, anterior }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Datos del Cliente</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Nombre"
        value={datos.nombre}
        onChange={(e) => actualizar("nombre", e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Apellido"
        value={datos.apellido}
        onChange={(e) => actualizar("apellido", e.target.value)}
      />

      <input
        type="number"
        className="border p-2 w-full mb-2"
        placeholder="Edad"
        value={datos.edad}
        onChange={(e) => actualizar("edad", e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Teléfono"
        value={datos.telefono}
        onChange={(e) => actualizar("telefono", e.target.value)}
      />

      <input
        type="email"
        className="border p-2 w-full mb-2"
        placeholder="Correo electrónico"
        value={datos.email}
        onChange={(e) => actualizar("email", e.target.value)}
      />

      {/* Preguntas médicas */}
      <label>
        <input
          type="checkbox"
          checked={datos.diabetes}
          onChange={(e) => actualizar("diabetes", e.target.checked)}
        />{" "}
        Diabetes
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          checked={datos.circulacion}
          onChange={(e) => actualizar("circulacion", e.target.checked)}
        />{" "}
        Problemas de circulación
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          checked={datos.alergias}
          onChange={(e) => actualizar("alergias", e.target.checked)}
        />{" "}
        Alergias
      </label>
      <br />

      {datos.alergias && (
        <input
          className="border p-2 w-full mt-2"
          placeholder="Describe las alergias"
          value={datos.alergiasDescripcion}
          onChange={(e) => actualizar("alergiasDescripcion", e.target.value)}
        />
      )}

      <div className="flex justify-between mt-4">
        <button className="bg-gray-400 text-white p-2 rounded" onClick={anterior}>
          Atrás
        </button>

        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={siguiente}
          disabled={!datos.nombre || !datos.apellido || !datos.telefono}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
