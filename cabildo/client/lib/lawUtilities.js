getLawState = function(lawStateCode){
  if(lawStateCode == LAW_STATE_IN_PROGRESS){
    return "En tramitación";
  }
  else if(lawStateCode == LAW_STATE_CLOSED){
  	return "Ley cerrada";
  }
  return "Estado de ley no determinado"
}