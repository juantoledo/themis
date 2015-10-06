getLawState = function(lawStateCode){
  if(lawStateCode == LAW_STATE_IN_PROGRESS){
    return "En tramitación";
  }
  else if(lawStateCode == LAW_STATE_CLOSED){
  	return "Ley cerrada";
  }
  return "Estado de ley no determinado"
}

getCongressLawType = function(congressLawType){
  if(congressLawType == LAW_TYPE_CONGRESS_DEPUTY){
    return "Camara de diputados";
  }
  else if(congressLawType == LAW_TYPE_CONGRESS_SENATOR){
  	return "Senadores";
  }
  return "Tipo de ley de congreso no determinado"
}