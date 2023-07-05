## Rotas acessíveis pela API

### Criar Restaurante
&rarr; {/restaurant, POST}  
	Cria restaurantes com seu menu de itens

	Exemplo de Payload:
	```json
		{
			"name": "Meu restaurante",
			"menu": 
			[ 
				{
					"name": "Carbonara",
					"ingredients": ["Macarrão", "ovo"],
					"kcal": 200,
					"isActive": true
				},
				{
					"name": "Ovo frito",
					"ingredients": ["Ovo", "manteiga"],
					"kcal": 160,
					"isActive": true
				}
			]
		}
	```
### Buscar Restaurante Geral
&rarr; {/restaurant, GET}  
	Busca por todos os restaurantes e seus menus no banco

### Buscar Restaurante Específico
&rarr; {/restaurant/:id, GET}  
	Busca restaurante específico através do id passado por parâmetro

### Atualizar Restaurante Específico
&rarr; {/restaurant/:id, PATCH}  
	Atualiza dados de restaurante de id passado por parametro com informações passadas via payload, suporta alteração de cnpj e nome do restaurante, além da inserção de itens não existentes no menu, caso possua item existente no payload, retorna erro.

	Exemplo de Payload:
	```json
		{
			"cnpj": 00000000000000,
			"nome": "nome do restaurante",
			"menu": [
				{
					"nome": "nome do item"
					"ingredients": [
						"ing1",
						"ing2"
					],
					"kcal": 000,
					"isActive": true
				}
			]
		}
	```
### Atualizar Item de Menu Específico
&rarr; {/restaurant/menuitem/:id, PATCH}  
	Atualiza dados de item do menu
	
### Ativar Restaurante Específico
&rarr; {/restaurant/activate/:id, PATCH}  
	Ativa restaurante com id passado por parâmetro

### Desativar Restaurante Específico
&rarr; {/restaurant/deactivate/:id, PATCH}  
	Desativa restaurante com id passado por parâmetro

### Ativar Item de Menu Específico
&rarr; {/restaurant/activate/menuitem/:id, PATCH}  
	Ativa item de menu com id passado por parâmetro

### Desativar Item de Menu Específico
&rarr; {/restaurant/deactivate/menuitem/:id, PATCH}  
	Desativa item de menu com id passado por parâmetro

### Recomendar Item Específico por Keywords
&rarr; {/restaurant/recommend, GET}  
	Recomendação de prato baseado em keywords para filtragem no payload

	Exemplo de Payload:
	```json
		{
			"cuisine": "Brazillian",
			"cravings: "Sweet"
		}
	```

	Outros filtros disponíveis estão presentes na interface MenuFilters:
		spiciness
		cuisine
		dietaryPreferences
		calorieRange
		allergies
		specialDiets
		preparationTime
		occasions
		textures
		freshness
		cravings
