package cloud.handball.authservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cloud.handball.authservice.domain.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, String>{
	
	Authority findByName(String name);
	
}