import { SetStateAction, useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import { FormHelperText, Grid, MenuItem, Select, TextField } from '@mui/material'
import { Form, FormikConfig, FormikProvider, useFormik } from 'formik'
import { IFormInitialValues, Props } from './alta-modificacion-turno'
import { initialValues, style } from './AltaModificacionTurno.constants'
import { IEspecialista, ISocio, ITurno } from '../../types'
import { TurnosAPI } from '../../api/turnos-api'

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EspecialistasAPI } from '../../api/especialistas-api'
import { SociosAPI } from '../../api/socios-api'
import { AppContext } from '../../context/AppContext'

export const AltaModificacionTurno: React.FC<Props> = ({
                                                       handleCloseDialog,
                                                       handleSubmit,
                                                       initialFormValues,
                                                       openDialog,
                                                       title,
                                                       selectedIdRow
                                                     }) => {
  const [turnoEspecialista, setTurnoEspecialista] = useState<Dayjs>( dayjs() )
  const [turno, setTurno] = useState<ITurno>()
  const [profesionales, setProfesionales] = useState<IEspecialista[]>([]);
  const [socios, setSocios] = useState<ISocio[]>([]);

  const { setTurnos } = useContext(AppContext) 

  const formikProps: FormikConfig<IFormInitialValues> = {
    enableReinitialize: true,
    initialValues: { ...initialValues, ...initialFormValues },
    onSubmit: async (values: any) => {
      if (!values.fechaTurno) {
        formik.setFieldError('fechaTurno', 'Debe seleccionar una fecha de turno');
        return;
      }

      handleSubmitData(values);

      TurnosAPI
        .getTurnos()
        .then((turnos) => setTurnos(turnos))

      handleCloseDialog();
    }
  }

  const formik = useFormik(formikProps)

  const handleSubmitData = (turno: ITurno) => {
    handleSubmit(turno)
  }

  const toggleCancelado = () => {
    formik.setFieldValue('cancelado', !formik.values.cancelado);
  };
  

  const disableDays = (date: Dayjs) => {
    return !date.isSame(turnoEspecialista, 'day');

  };

  useEffect(() => {
    if(turno){
        formik.setFieldValue('socioID', turno.socioID)
        formik.setFieldValue('profesionalID', turno.profesionalID)
        formik.setFieldValue('id', selectedIdRow)
        formik.setFieldValue('motivoDeConsultaTurno', turno.motivoDeConsultaTurno)
        formik.setFieldValue('cancelado', turno.cancelado)

        if(turno.fechaTurno)
          formik.setFieldValue('fechaTurno', dayjs(turno.fechaTurno))

        EspecialistasAPI
          .getEspecialistas()
          .then((especialistas: IEspecialista[]) => setProfesionales(especialistas))
    }
    
  }, [turno])

  useEffect(( ) => {
    if(selectedIdRow){
      TurnosAPI
        .getTurnoByID(selectedIdRow)
        .then((turno: ITurno) => {
            setTurno(turno)
        })
    }
  }, [selectedIdRow])

  useEffect(( ) => {
    EspecialistasAPI
      .getEspecialistas()
      .then((especialistas: IEspecialista[]) => setProfesionales(especialistas))

      SociosAPI
        .getSocios()
        .then((sociosListados: SetStateAction<ISocio[]>) => setSocios(sociosListados))
  }, [])

  useEffect(() => {
    if(formik.values.profesionalID){
      EspecialistasAPI
       .getEspecialistaByID(formik.values.profesionalID)
       .then(especialista => 
        setTurnoEspecialista(dayjs(especialista.horarios[0]))
       )
    }
  },[formik.values.profesionalID])

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={() => { formik.resetForm(); handleCloseDialog(); }}>
        <DialogTitle sx={style}>{title}</DialogTitle>
        <FormikProvider value={formik}>
          <Form noValidate>
            <DialogContent sx={style}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Motivo de consulta"
                    name="motivoDeConsultaTurno"
                    margin="dense"
                    multiline
                    rows={2}
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.motivoDeConsultaTurno}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    label="Socio"
                    name="socioID"
                    onChange={formik.handleChange}
                    value={formik.values.socioID}
                  >
                    {socios?.map((socio) => (
                      <MenuItem key={socio.id} value={socio.id}>
                        {socio.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    label="Profesional"
                    name="profesionalID"
                    onChange={formik.handleChange}
                    value={formik.values.profesionalID || ''}
                  >
                    {profesionales?.map((profesional) => (
                      <MenuItem key={profesional.id} value={profesional.id}>
                        {profesional.nombreMedico}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Fecha del turno"
                      value={formik.values.fechaTurno}
                      onChange={(date) => formik.setFieldValue('fechaTurno', date)}
                      shouldDisableDate={disableDays}
                    />
                  </LocalizationProvider>
                  {formik.errors.fechaTurno && (
                    <FormHelperText error>{'Ingrese una fecha válida para el turno'}</FormHelperText>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={style}>
              <Button color="inherit" onClick={handleCloseDialog} size="small" variant="contained">
                Salir
              </Button>
              <Button color="success" size="small" type="submit" variant="contained">
                Guardar
              </Button>
              {!!turno && (
                <Button
                  color={formik.values.cancelado ? 'info' : 'error'}
                  size="small"
                  onClick={toggleCancelado}
                  variant="contained"
                >
                  {formik.values.cancelado ? 'Habilitar' : 'Cancelar'}
                </Button>
              )}
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </>
  )
}
